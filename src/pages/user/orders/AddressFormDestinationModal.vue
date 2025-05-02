<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { BlockStack } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogFooter, DialogHeader, DialogScrollContent, DialogTitle } from '@/components/ui/dialog';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Separator from '@/components/ui/separator/Separator.vue';
import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { Address } from '@/types/address';
import { useField, useForm } from 'vee-validate';
import { onMounted, Ref, ref, watch } from 'vue';

const props = defineProps<{
    title: string;
}>();

const emit = defineEmits<{
    onSuccess: [message: Omit<Address, 'id' | 'full_address'>];
}>();

const open = defineModel<boolean>('open');
const destination = defineModel<Address>();

const auth = useAuthStore();

const { errors, handleSubmit, isSubmitting, setErrors, resetForm } = useForm();

const { value: name }: { value: Ref<string> } = useField('name');
const { value: phone }: { value: Ref<string> } = useField('phone');
const { value: address }: { value: Ref<string> } = useField('address');
const { value: city }: { value: Ref<string> } = useField('city');
const { value: subdistrict }: { value: Ref<string> } = useField('subdistrict');
const { value: province }: { value: Ref<string> } = useField('province');
const { value: zip }: { value: Ref<string> } = useField('zip');
const { value: note }: { value: Ref<string> } = useField('note');

const provinces = ref<string[]>([]);

const fetchProvinces = () => {
    axios
        .get('/api/addresses/provinces', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((response) => {
            provinces.value = response.data.data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

onMounted(() => {
    fetchProvinces();
});

const submit = handleSubmit(async (values) => {
    emit('onSuccess', values as Omit<Address, 'id' | 'full_address'>);
});

watch(open, () => {
    if (!open.value) {
        resetForm();
    } else {
        name.value = destination.value?.name || '';
        phone.value = destination.value?.phone || '';
        address.value = destination.value?.address || '';
        city.value = destination.value?.city || '';
        subdistrict.value = destination.value?.subdistrict || '';
        province.value = destination.value?.province || '';
        zip.value = destination.value?.zip || '';
        note.value = destination.value?.note || '';
    }
});
</script>

<template>
    <Dialog v-model:open="open">
        <DialogScrollContent>
            <DialogHeader>
                <DialogTitle>{{ props.title }}</DialogTitle>
            </DialogHeader>
            <form method="post" @submit.prevent="submit" id="address-form" class="mt-4">
                <BlockStack>
                    <BlockStack class="gap-2">
                        <Label for="name">Nama</Label>
                        <Input type="text" id="name" name="name" v-model="name" />
                        <InputError :message="errors.name" />
                    </BlockStack>

                    <BlockStack class="gap-2">
                        <Label for="phone">No. Telepon</Label>
                        <Input type="text" id="phone" name="phone" v-model="phone" />
                        <InputError :message="errors.phone" />
                    </BlockStack>
                    <Separator />
                    <BlockStack class="gap-2">
                        <Label for="address">Alamat</Label>
                        <Input type="text" id="address" name="address" v-model="address" />
                        <InputError :message="errors.address" />
                    </BlockStack>

                    <BlockStack class="gap-2">
                        <Label for="subdistrict">Kecamatan</Label>
                        <Input type="text" id="subdistrict" name="subdistrict" v-model="subdistrict" />
                        <InputError :message="errors.subdistrict" />
                    </BlockStack>

                    <BlockStack class="gap-2">
                        <Label for="city">Kota/Kabupaten</Label>
                        <Input type="text" id="city" name="city" v-model="city" />
                        <InputError :message="errors.city" />
                    </BlockStack>

                    <BlockStack class="flex-row">
                        <BlockStack class="flex-1 gap-2">
                            <Label for="province">Provinsi</Label>
                            <Select id="province" name="province" v-model="province">
                                <SelectTrigger class="w-full">
                                    <SelectValue class="w-full" placeholder="Pilih provinsi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="(row, key) in provinces" :key="key" :value="row">
                                        {{ row }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError :message="errors.province" />
                        </BlockStack>
                        <BlockStack class="w-32 gap-2">
                            <Label for="zip">Kode pos</Label>
                            <Input type="text" id="zip" name="zip" v-model="zip" />
                            <InputError :message="errors.zip" />
                        </BlockStack>
                    </BlockStack>

                    <BlockStack class="gap-2">
                        <Label for="note">Catatan (opsional)</Label>
                        <Input type="text" id="note" name="note" v-model="note" />
                        <InputError :message="errors.note" />
                    </BlockStack>
                </BlockStack>
            </form>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="secondary">Tutup</Button>
                </DialogClose>
                <Button type="submit" :disabled="isSubmitting" form="address-form">
                    <Loader :is-loading="isSubmitting" />
                    Simpan
                </Button>
            </DialogFooter>
        </DialogScrollContent>
    </Dialog>
</template>
