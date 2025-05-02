<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { BlockStack } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Separator from '@/components/ui/separator/Separator.vue';
import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { Address } from '@/types/address';
import { useField, useForm } from 'vee-validate';
import { onMounted, Ref, ref } from 'vue';

const emit = defineEmits<{
    onSuccess: [message: string];
}>();

const model = defineModel<Address>();

const auth = useAuthStore();

const { errors, handleSubmit, isSubmitting, setErrors } = useForm({
    initialValues: {
        name: model.value?.name || '',
        address: model.value?.address || '',
        phone: model.value?.phone || '',
        province: model.value?.province || '',
        city: model.value?.city || '',
        subdistrict: model.value?.subdistrict || '',
        zip: model.value?.zip || '',
        note: model.value?.note || '',
    },
});

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
    try {
        if (model.value) {
            const { data } = await axios.patch(`/api/addresses/${model.value.id}`, values, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            emit('onSuccess', data.message);
        } else {
            const { data } = await axios.post('/api/addresses', values, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            emit('onSuccess', data.message);
        }
    } catch (err: any) {
        if (err.response.status !== 422) throw err;

        setErrors(err.response.data.errors);
    }
});
</script>

<template>
    <form method="post" @submit.prevent="submit">
        <BlockStack>
            <Card>
                <CardContent>
                    <BlockStack>
                        <BlockStack class="gap-2">
                            <Label for="name">Nama pengirim</Label>
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

                        <div>
                            <Button type="submit" :disabled="isSubmitting">
                                <Loader :is-loading="isSubmitting" />
                                Simpan
                            </Button>
                        </div>
                    </BlockStack>
                </CardContent>
            </Card>
        </BlockStack>
    </form>
</template>
